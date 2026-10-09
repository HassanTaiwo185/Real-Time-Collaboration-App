pipeline {
    agent any

    environment {
        BACKEND_IMAGE  = 'collabsup-backend'
        FRONTEND_IMAGE = 'collabsup-frontend'
        VITE_API_URL   = 'http://localhost:8000/api'
        VITE_WS_URL    = 'ws://localhost:8000/'
        TRIVY_VERSION  = '0.72.0'
        AWS_REGION     = 'us-east-1'
    }

    stages {

        stage('Build') {
            steps {
                script {
                    env.IMAGE_TAG = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                }

                sh '''
                    
                    docker build --pull --no-cache \
                      -t ${BACKEND_IMAGE}:${IMAGE_TAG} ./backend

                    docker build --pull --no-cache \
                      --build-arg VITE_API_URL=${VITE_API_URL} \
                      --build-arg VITE_WS_URL=${VITE_WS_URL} \
                      -t ${FRONTEND_IMAGE}:${IMAGE_TAG} ./frontend

                '''
            }
        }

        stage('Trivy Scan') {
            steps {
                sh '''
                    for IMAGE in ${BACKEND_IMAGE} ${FRONTEND_IMAGE}; do
                      docker run --rm \
                        -v /var/run/docker.sock:/var/run/docker.sock \
                        -v trivy-cache:/root/.cache/ \
                        aquasec/trivy:${TRIVY_VERSION} image \
                        --timeout 15m \
                        --exit-code 1 \
                        --severity HIGH,CRITICAL \
                        --ignore-unfixed \
                        ${IMAGE}:${IMAGE_TAG}
                    done
                '''
            }
        }

        stage('Unit Tests') {
            environment {
                NET           = "ci-${BUILD_NUMBER}"
                PG            = "pg-${BUILD_NUMBER}"
                REDIS         = "redis-${BUILD_NUMBER}"
                BREVO_API_KEY = credentials('brevo-api-key')
            }
            steps {
                sh '''
                    docker network create $NET

                    docker run -d --name $PG --network $NET \
                      -e POSTGRES_DB=collaboration_db \
                      -e POSTGRES_USER=postgres \
                      -e POSTGRES_PASSWORD=postgres \
                      postgres:16-alpine

                    docker run -d --name $REDIS --network $NET redis:7-alpine

                    until docker exec $PG pg_isready -U postgres; do sleep 1; done

                    docker run --rm --network $NET \
                      -e SECRET_KEY=ci-throwaway-key \
                      -e DEBUG=False \
                      -e FRONTEND_URL=http://localhost:5173 \
                      -e REDIS_URL=redis://$REDIS:6379/0 \
                      -e CELERY_BROKER_URL=redis://$REDIS:6379/0 \
                      -e DB_NAME=collaboration_db \
                      -e DB_USER=postgres \
                      -e DB_PASSWORD=postgres \
                      -e DB_HOST=$PG \
                      -e DB_PORT=5432 \
                      -e BREVO_API_KEY \
                      ${BACKEND_IMAGE}:${IMAGE_TAG} python manage.py test
                '''
            }
            post {
                always {
                    sh '''
                        docker rm -f $PG $REDIS || true
                        docker network rm $NET || true
                    '''
                }
            }
        }

        stage('ECR Login') {
            agent {
                docker {
                    image 'amazon/aws-cli:2.15.0'
                    reuseNode true
                    args "--entrypoint=''"
                }
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'my_aws',
                                                  usernameVariable: 'AWS_ACCESS_KEY_ID',
                                                  passwordVariable: 'AWS_SECRET_ACCESS_KEY')]) {
                    sh 'aws ecr get-login-password --region $AWS_REGION > .ecr-token'
                }
            }
        }

        stage('Push to ECR') {
            environment {
                AWS_ACCOUNT_ID = credentials('aws-account-id')
            }
            steps {
                sh '''
                    ECR_REGISTRY="$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com"

                    docker login --username AWS --password-stdin $ECR_REGISTRY < .ecr-token
                    rm -f .ecr-token

                    for IMAGE in $BACKEND_IMAGE $FRONTEND_IMAGE; do
                      docker tag  $IMAGE:$IMAGE_TAG $ECR_REGISTRY/$IMAGE:$IMAGE_TAG
                      docker push $ECR_REGISTRY/$IMAGE:$IMAGE_TAG
                    done
                '''
            }
            post {
                always {
                    sh 'docker logout "$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com" || true'
                }
            }
        }

    }

    post {
        always {
            sh 'rm -f .ecr-token'
        }
    }
}