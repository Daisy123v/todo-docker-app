pipeline {
    agent any

    stages {
        stage('Build Images') {
            steps {
                sh 'docker build -t daisy2256/todo-app-backend:latest ./backend'
                sh 'docker build -t daisy2256/todo-app-frontend:latest ./frontend'
            }
        }

        stage('Login Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_HUB_USERNAME', passwordVariable: 'DOCKER_HUB_PASSWORD')]) {
                    sh 'echo $DOCKER_HUB_PASSWORD | docker login -u $DOCKER_HUB_USERNAME --password-stdin'
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
