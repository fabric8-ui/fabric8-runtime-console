@Library('github.com/fabric8io/fabric8-pipeline-library@master')
def dummy
kubeProxyTemplate {
  nodejsNode {
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
        def dockerImage = 'fabric8/fabric8-runtime-console:${newVersion}'
        container('docker') {
          sh "docker build -t ${dockerImage} ."
          sh "docker push ${dockerImage}"
        }
      }
    }
  }
}
