pipeline {
    agent any

    stages {
        stage ('build') {

            steps {
                withMaven(maven : 'mvn3.6.3') {
                    sh 'mvn clean compile'
                }
            }
        }

        stage ('test') {

            steps {
                withMaven(maven : 'mvn3.6.3') {
                    sh 'mvn test'
                }
            }
        }


        stage ('deploy') {
            steps {
                withMaven(maven : 'mvn3.6.3') {
                    sh 'mvn deploy'
                }
            }
        }
    }
}
