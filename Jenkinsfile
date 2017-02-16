@Library('github.com/rawlingsj/fabric8-pipeline-library@master')
def name = 'fabric8-runtime-console'
def org = 'fabric8-ui'

if (env.BRANCH_NAME.startsWith('PR-')) {
    echo 'Running CI pipeline'
    kubeProxyTemplate {
        nodejsNode() {
            ws(name) {
                git "https://github.com/${org}/${name}.git"
                readTrusted 'release.groovy'
                container('nodejs') {
                    sh 'yarn'
                    sh 'sh ./karma-xvfb.sh'
                }
            }
        }
    }
} else if (env.BRANCH_NAME.equals('master')) {
    echo 'Running CD pipeline'
    dockerTemplate {
        chunkyNode {
            ws(name) {
                git "https://github.com/${org}/${name}.git"
                readTrusted 'release.groovy'
                sh "git remote set-url origin git@github.com:${org}/${name}.git"

                stage 'Generate and stage YAML'
                def pipeline = load 'release.groovy'
                def stagedProject = pipeline.stage()

                def newVersion = stagedProject[1]

                container('chunky') {
                    stage('Build') {
                        sh 'yarn'
                        sh 'ng build --prod'
                    }
                }

                container('docker') {
                    stage 'Build image'
                    sh "docker build -t fabric8/fabric8-runtime-console:${newVersion} ."

                    stage 'Push image'
                    sh "docker push fabric8/fabric8-runtime-console:${newVersion}"
                }

                stage 'Promote release to maven central'
                pipeline.release(stagedProject)

                stage 'Update downstream dependencies'
                pushPomPropertyChangePR {
                    propertyName = 'fabric8-ui.version'
                    projects = [
                            'fabric8io/fabric8-online'
                    ]
                    version = newVersion
                    containerName = 'chunky'
                }
            }
        }
    }
}