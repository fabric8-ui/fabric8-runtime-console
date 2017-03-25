#!/usr/bin/groovy

def ci (){
    stage('install'){
        sh 'npm install'
        sh 'npm run build'
    }

    stage('test'){
        sh 'npm test'
    }
}

def cd (b){
    stage('fix git repo'){
        sh './fix-git-repo.sh'
    }

    stage('npm run build'){
        sh 'npm run build'
    }

    stage('release'){
        def published = npmRelease{
            branch = b
        }
        return published
    }
}

def updateDownstreamProjects(v){
    pushPackageJSONChangePR{
        propertyName = 'fabric8-runtime-console'
        projects = [
                'fabric8-ui/fabric8-npm-dependencies'
        ]
        version = v
    }
}

return this