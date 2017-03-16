#!/usr/bin/groovy

def ci (){
    stage('test'){
        sh 'npm install'
        sh 'npm test'
    }
}

def cd (b){
    stage('fix git repo'){
        sh './fix-git-repo.sh'
    }

    stage('build'){
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
                'fabric8io/fabric8-ui'
        ]
        version = v
    }
}

return this