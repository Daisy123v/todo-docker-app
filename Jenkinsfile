pipeline {
    agent any

    environment {
        DOCKERHUB_USER = "daisy2256"
    }

    stages {

        stage('Build Images') {
            steps {
                sh 'docker build -t daisy2256/todo-app-backend:latest ./backend'
                sh 'docker build -t daisy2256/todo-app-frontend:latest ./frontend'
            }
        }

        stage('Login Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-hub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push Images') {
            steps {
                sh 'docker push daisy2256/todo-app-backend:latest'
                sh 'docker push daisy2256/todo-app-frontend:latest'
            }
        }
    }
}
