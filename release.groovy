#!/usr/bin/groovy
def repo(){
 return 'fabric8-ui/fabric8-runtime-console'
}

def stage(){
  return stageProject{
    project = repo()
    useGitTagForNextVersion = true
    containerName = 'chunky'
  }
}

def release(project){
  releaseProject{
    stagedProject = project
    useGitTagForNextVersion = true
    helmPush = false
    groupId = 'io.fabric8.platform.console2'
    githubOrganisation = 'fabric8-ui'
    artifactIdToWatchInCentral = 'fabric8-runtime-console'
    artifactExtensionToWatchInCentral = 'pom'
    promoteToDockerRegistry = 'docker.io'
    dockerOrganisation = 'fabric8'
    containerName = 'chunky'
  }
}

return this