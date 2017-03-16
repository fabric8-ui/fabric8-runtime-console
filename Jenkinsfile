@Library('github.com/fabric8io/fabric8-pipeline-library@master')
def utils = new io.fabric8.Utils()
def repo = 'fabric8-runtime-console'
def org = 'fabric8-ui'

fabric8UITemplate{
    clientsNode{
        ws {
            if (utils.isCI()){
                checkout scm
                readTrusted 'release.groovy'
                def pipeline = load 'release.groovy'
                
                container('ui'){
                    pipeline.ci()
                }
            } else if (utils.isCD()){

                git "https://github.com/${org}/${repo}.git"
                readTrusted 'release.groovy'
                sh "git remote set-url origin git@github.com:${org}/${repo}.git"
                def pipeline = load 'release.groovy'

                def branch
                container('clients'){
                    branch = utils.getBranch()
                }
                
                def published
                container('ui'){
                    published = pipeline.cd(branch)
                }

                def releaseVersion
                container('clients'){
                    releaseVersion = utils.getLatestVersionFromTag()
                }

                if (published){
                    pipeline.updateDownstreamProjects(releaseVersion)
                }
            } 
        }
    }
}