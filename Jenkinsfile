pipeline {
    agent any
        tools {
        nodejs "nodeJS"
    }

    environment {
        BASE_URL = credentials('BASE_URL')
        NINZA_USERNAME = credentials('NINZA_USERNAME')
        NINZA_PASSWORD = credentials('NINZA_PASSWORD')
    }
    stages {

        stage('Checkout') {
            steps {
                 git branch: 'develop', url: 'https://github.com/intern3g3-svg/NinzaCRM.git'
                echo 'Cloning repository from GitHub...'
                git(
                    url: 'https://github.com/intern3g3-svg/NinzaCRM.git', 
                    //credentialsId: "${GIT_CREDENTIALS}", 
                    branch: 'develop'
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
        // Send email on success
             // Send email on success with link to Allure report
            emailext(
                subject: "Jenkins Build Successful: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                    <p>Hi Team,</p>
                    <p>The Jenkins build <b>${env.JOB_NAME} #${env.BUILD_NUMBER}</b> was successful.</p>
                    <p>View the Allure report here: <a href="${env.BUILD_URL}allure/">Allure Report</a></p>
                    <p>Regards,<br/>Jenkins CI</p>
                """,
                to: "poornitha.rameshkumar@gmail.com",
                mimeType: 'text/html'
            )
        }
        failure {
        echo 'Some tests failed '
        // Send email on failure
           echo 'Some tests failed'
            // Send email on failure with link to Allure report
            emailext(
                subject: "Jenkins Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                    <p>Hi Team,</p>
                    <p>The Jenkins build <b>${env.JOB_NAME} #${env.BUILD_NUMBER}</b> has failed.</p>
                    <p>Check the Allure report here: <a href="${env.BUILD_URL}allure/">Allure Report</a></p>
                    <p>Regards,<br/>Jenkins CI</p>
                """,
                to: "poornitha.rameshkumar@gmail.com",
                mimeType: 'text/html'
            )
        }
    }
   
}
