@Library('github.com/rawlingsj/fabric8-pipeline-library@master')
def dummy

nodejsNode {
  def name = 'fabric8-runtime-console'
  def org = 'rawlingsj'
  ws(name){
    git "https://github.com/${org}/${name}.git"
    sh "git remote set-url origin git@github.com:${org}/${name}.git"
    container('nodejs') {
      sh 'yarn'
      sh 'npm test'
    }
  }
}
