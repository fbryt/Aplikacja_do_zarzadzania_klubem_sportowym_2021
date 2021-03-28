pipeline {
    agent any
    tools {
        maven 'mvn3.6.3' 
    }

    stages {
        stage ('build') {

            steps {
                
                    sh 'mvn -f ./SportClub-api/pom.xml clean compile'
                   
                
            }
        }

        stage ('test') {

            steps {
               
                    sh 'mvn -f ./SportClub-api/pom.xml test'
                   
                
            }
        }


        stage ('deploy') {
            steps {
               
                    sh 'mvn -f ./SportClub-api/pom.xml deploy'
                  
                
            }
        }
    }
}
