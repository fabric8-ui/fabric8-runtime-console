@Library('github.com/fabric8io/fabric8-pipeline-library@master')
def dummy
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
    } else {
      echo 'Running CD pipeline'
      sh "git remote set-url origin git@github.com:${org}/${name}.git"
    }

  }
}
