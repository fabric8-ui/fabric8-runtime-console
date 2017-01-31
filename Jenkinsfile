@Library('github.com/fabric8io/fabric8-pipeline-library@master')
def dummy
kubeProxyTemplate {
  nodejsNode(nodejsImage: 'fabric8/nodejs-builder:0.0.2', clientsImage:'fabric8/builder-clients:0.1') {
    def name = 'fabric8-runtime-console'
    def org = 'fabric8-ui'
    ws(name){
      git "https://github.com/${org}/${name}.git"

      if (env.BRANCH_NAME.startsWith('PR-')){
        echo 'Running CI pipeline'

        container('nodejs') {
          sh 'yarn'
          sh 'sh ./karma-xvfb.sh'
        }
      } else if (env.BRANCH_NAME.equals('master')){
        echo 'Running CD pipeline'
        sh "git remote set-url origin git@github.com:${org}/${name}.git"

        container('nodejs') {
          sh 'yarn'
          sh 'ng build --prod'
        }

        def newVersion = performCanaryRelease {}
        
        container('docker') {
          sh "docker build -t fabric8/fabric8-runtime-console:${newVersion} ."
          sh "docker push fabric8/fabric8-runtime-console:${newVersion}"
        }
      }
    }
  }
}
