## Tools
- git (avec repos github)
- vscode
- docker
- nodejs
- cli angular


## Command pour démarrer un conteneur docker
docker run -d --name sonarqube -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true -p 9000:9000 sonarqube:latest