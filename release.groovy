#!/usr/bin/groovy

def ci (){

    stage('build runtime npm'){
        sh 'npm install'
        sh 'npm run build'
    }

    stage('test'){
        sh 'npm test'
    }
}

def ciBuildDownstreamProject(project){
    stage('build fabric8-ui npm'){
        return buildSnapshotFabric8UI{
            pullRequestProject = project
        }   
    }
}

def buildImage(imageName){
    stage('build snapshot image'){
        sh "cd fabric8-ui && docker build -t ${imageName} -f Dockerfile.deploy ."
    }        
    
    stage('push snapshot image'){
        sh "cd fabric8-ui && docker push ${imageName}"
    }
}

def cd (b){
    stage('fix git repo'){
        sh './fix-git-repo.sh'
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
        containerName = 'ui'
        autoMerge = true
    }
}

return this