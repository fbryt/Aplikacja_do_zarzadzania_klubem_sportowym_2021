pipeline {
    agent any
    tools {
        maven 'mvn3.6.3' 
    }

    stages {
        stage ('build') {

            steps {
                
                    sh 'mvn clean compile'
                
            }
        }

        stage ('test') {

            steps {
               
                    sh 'mvn test'
                
            }
        }


        stage ('deploy') {
            steps {
               
                    sh 'mvn deploy'
                
            }
        }
    }
}
