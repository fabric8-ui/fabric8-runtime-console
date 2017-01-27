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
          // example of connecting to the api server
          sh 'curl http://127.0.0.1:8001/api/v1/'
          sh 'curl http://127.0.0.1:8001/oapi'
          sh 'yarn'
          sh 'sh ./karma-xvfb.sh'
        }
      } else {
        echo 'Running CD pipeline'
        sh "git remote set-url origin git@github.com:${org}/${name}.git"
      }
    }
  }
}
