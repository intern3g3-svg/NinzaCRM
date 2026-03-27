pipeline {
    agent any  // run on any available Jenkins node

    // Use NodeJS configured in Jenkins Global Tool Configuration
    tools { 
        nodejs "NodeJS"  // Make sure this matches the name you gave NodeJS in Jenkins
    }

    environment {
        // Optional: GitHub credentials ID if your repo is private
      // GIT_CREDENTIALS = 'github-token-id' 
        BASE_URL = credentials('BASE_URL')
        NINZA_USERNAME = credentials('NINZA_USERNAME')
        NINZA_PASSWORD = credentials('NINZA_PASSWORD')
       
    }

    options {
        // Abort build if it hangs more than 30 minutes
        timeout(time: 30, unit: 'MINUTES')
        // Keep only last 10 builds
        buildDiscarder(logRotator(numToKeepStr: '10'))
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
                bat 'npm install'
                echo 'Installing Playwright browsers...'
                bat 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                echo 'Running Playwright tests...'
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
