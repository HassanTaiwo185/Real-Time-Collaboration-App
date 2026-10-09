pipeline {
    agent any

    environment {
        BACKEND_IMAGE  = 'collabsup-backend'
        FRONTEND_IMAGE = 'collabsup-frontend'
        VITE_API_URL   = 'http://localhost:8000/api'
        VITE_WS_URL    = 'ws://localhost:8000/'
    }

    stages {

        stage('Build') {
            steps {
                script {
                    env.IMAGE_TAG = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                }

                sh '''
                    docker build -t ${BACKEND_IMAGE}:${IMAGE_TAG} ./backend

                    docker build \
                      --build-arg VITE_API_URL=${VITE_API_URL} \
                      --build-arg VITE_WS_URL=${VITE_WS_URL} \
                      -t ${FRONTEND_IMAGE}:${IMAGE_TAG} ./frontend
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

    }
}