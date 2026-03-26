pipeline {
    agent any
        tools {
        nodejs "node18"
    }

    environment {
        BASE_URL = credentials('BASE_URL')
        NINZA_USERNAME = credentials('NINZA_USERNAME')
        NINZA_PASSWORD = credentials('NINZA_PASSWORD')
    }
    stages {
        stage('Checkout') {
            steps {
                // Replace with your GitHub repo URL
                git branch: 'feature-Sudha', url: 'https://github.com/arizona12345/NinzaCRM1.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // On Windows, use 'bat' to run commands
                bat 'npm install'
                bat 'npx playwright install --with-deps'
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
            //publish allure reports
        allure([
            includeProperties: false,
            jdk: '',
            results: [[path: 'allure-results']]
        ])
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
