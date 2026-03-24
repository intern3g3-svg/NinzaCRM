pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Replace with your GitHub repo URL
                git branch: 'main', url: 'https://github.com/intern3g3-svg/NinzaCRM.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // On Windows, use 'bat' to run commands
                bat 'npm install'
                bat 'npx playwright install'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npx playwright test'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished!'
        }
        success {
            echo 'All tests passed '
        }
        failure {
            echo 'Some tests failed '
        }
    }
}