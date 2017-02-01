@Library('github.com/fabric8io/fabric8-pipeline-library@master')
def name = 'fabric8-runtime-console'
def org = 'fabric8-ui'
  

  if (env.BRANCH_NAME.startsWith('PR-')){
    echo 'Running CI pipeline'
    kubeProxyTemplate {
      nodejsNode(nodejsImage: 'fabric8/nodejs-builder:0.0.2', clientsImage:'fabric8/builder-clients:0.1') {
        ws(name){
          git "https://github.com/${org}/${name}.git"
          container('nodejs') {
            sh 'yarn'
            sh 'sh ./karma-xvfb.sh'
          }
        }
      }
    }
  } else if (env.BRANCH_NAME.equals('master')){
    echo 'Running CD pipeline'
    dockerTemplate {
      nodejsNode(nodejsImage: 'fabric8/nodejs-builder:0.0.2', clientsImage:'fabric8/builder-clients:0.1') {
        ws(name){
          git "https://github.com/${org}/${name}.git"
          sh "git remote set-url origin git@github.com:${org}/${name}.git"
          container('nodejs') {
            sh 'yarn'
            sh 'ng build --prod'
          }

          def newVersion = getNewVersion {}
              
          container('docker') {
            sh "docker build -t fabric8/fabric8-runtime-console:${newVersion} ."
            sh "docker push fabric8/fabric8-runtime-console:${newVersion}"
          }
        }
      }
    }
  }

