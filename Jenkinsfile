pipeline {
    agent any

    stages {
        stage ('build') {

            steps {
                withMaven(maven : 'mvn3.6.3') {
                    bat 'mvn clean compile'
                }
            }
        }

        stage ('test') {

            steps {
                withMaven(maven : 'mvn3.6.3') {
                    bat 'mvn test'
                }
            }
        }


        stage ('deploy') {
            steps {
                withMaven(maven : 'mvn3.6.3') {
                    bat 'mvn deploy'
                }
            }
        }
    }
}
