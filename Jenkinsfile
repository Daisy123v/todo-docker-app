pipeline {
    agent any

    environment {
        DOCKERHUB_USER = "daisy2256"   // <-- remplace par ton Docker Hub username
        IMAGE_FRONT = "todo-frontend"
        IMAGE_BACK = "todo-backend"
    }

    stages {

        stage('Pull Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Daisy123v/todo-docker-app.git'   // <-- remplace USER par ton nom GitHub
            }
        }

        stage('Build Images') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Run Locally') {
            steps {
                sh 'docker compose up -d'
            }
        }

        stage('Login Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',    // <--- correspond à l'ID que tu as donné dans Jenkins credentials
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                }
            }
        }

        stage('Push Images') {
            steps {
                sh '''
                docker tag todo-docker-app-frontend $DOCKERHUB_USER/$IMAGE_FRONT:latest
                docker tag todo-docker-app-backend $DOCKERHUB_USER/$IMAGE_BACK:latest

                docker push $DOCKERHUB_USER/$IMAGE_FRONT:latest
                docker push $DOCKERHUB_USER/$IMAGE_BACK:latest
                '''
            }
        }
    }
}
