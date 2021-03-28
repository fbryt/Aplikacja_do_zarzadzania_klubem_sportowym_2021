pipeline {
    agent any
    tools {
        maven 'mvn3.6.3' 
    }

    stages {
        stage ('build') {

            steps {
                
                    bat 'mvn clean compile'
                
            }
        }

        stage ('test') {

            steps {
               
                    bat 'mvn test'
                
            }
        }


        stage ('deploy') {
            steps {
               
                    bat 'mvn deploy'
                
            }
        }
    }
}
