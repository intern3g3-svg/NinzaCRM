pipeline {
    agent any  // run on any available Jenkins node

    // Use NodeJS configured in Jenkins Global Tool Configuration
    tools { 
        nodejs "NodeJS"  // Make sure this matches the name you gave NodeJS in Jenkins
    }

    environment {
        // Optional: GitHub credentials ID if your repo is private
       GIT_CREDENTIALS = 'github-token-id' 
       
    }

    options {
        // Abort build if it hangs more than 30 minutes
        timeout(time: 30, unit: 'MINUTES')
        // Keep only last 10 builds
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
    environment {
        BASE_URL = credentials('BASE_URL')
        NINZA_USERNAME = credentials('NINZA_USERNAME')
        NINZA_PASSWORD = credentials('NINZA_PASSWORD')
    }

    environment {
        BASE_URL = credentials('BASE_URL')
        NINZA_USERNAME = credentials('NINZA_USERNAME')
        NINZA_PASSWORD = credentials('NINZA_PASSWORD')
    }
    stages {

        stage('Checkout') {
            steps {
                 git branch: 'main', url: 'https://github.com/intern3g3-svg/NinzaCRM.git'
                echo 'Cloning repository from GitHub...'
                git(
                    url: 'https://github.com/intern3g3-svg/NinzaCRM.git', 
                    //credentialsId: "${GIT_CREDENTIALS}", 
                    branch: 'main'
                )
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm packages...'
                sh 'npm install'
                echo 'Installing Playwright browsers...'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                echo 'Running Playwright tests...'
                sh 'npx playwright test --reporter=html'
            }
        }

    }

    post {
        always {
            echo 'Publishing HTML reports...'
            publishHTML([
                allowMissing: false, 
                alwaysLinkToLastBuild: true, 
                keepAll: true, 
                reportDir: 'playwright-report', 
                reportFiles: 'index.html', 
                reportName: 'Playwright Test Report'
            ])
        }

        success {
            echo 'Build succeeded!'
        }

        failure {
            echo 'Build failed!'
        }
    }
}
