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

def ciBuildDownstreamProject(){
    def runtimeDir = pwd()

    stage('build fabric8-ui npm'){
        sh 'git clone https://github.com/fabric8io/fabric8-ui'
        sh 'cd fabric8-ui && npm install'
        sh "cd fabric8-ui && npm install --save  ${runtimeDir}/dist"
        sh '''
        export FABRIC8_WIT_API_URL="http://api.prod-preview.openshift.io/api/"
        export FABRIC8_RECOMMENDER_API_URL="http://api-bayesian.dev.rdu2c.fabric8.io/api/v1/"
        export FABRIC8_FORGE_API_URL="https://forge.api.prod-preview.openshift.io"
        export FABRIC8_SSO_API_URL="http://sso.prod-preview.openshift.io/"

        cd fabric8-ui && npm run build:prod
        '''
    }
    def shortCommitSha = getNewVersion {}
    def tempVersion= 'SNAPSHOT.' + shortCommitSha + env.BUILD_NUMBER
    return tempVersion
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
        containerName = 'ui'
        autoMerge = true
    }
}

return this