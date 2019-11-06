import {Artifact, Execution} from '../src/generated/src/apis/metadata/metadata_store_pb';
import {stringValue} from '../src/TestUtils';
import {ArtifactCustomProperties, ExecutionCustomProperties, ExecutionProperties} from '../src/lib/Api';

// Test model
export const artifact1 = new Artifact();
artifact1.setId(1);
artifact1.setTypeId(3);
artifact1.setUri('gs://my-bucket/mnist');
const artifact1PropertiesMap = artifact1.getPropertiesMap();
artifact1PropertiesMap.set('name', stringValue('model'));
artifact1PropertiesMap.set('version', stringValue('v0'));
artifact1PropertiesMap.set('create_time', stringValue('2019-06-12T01:21:48.259263Z'));
artifact1.getCustomPropertiesMap().set(ArtifactCustomProperties.WORKSPACE, stringValue('workspace-1'));

// Test execution
const execution = new Execution();
// Uncomment if you want to update an existing execution.
execution.setId(3);
execution.getCustomPropertiesMap().set(ExecutionCustomProperties.WORKSPACE, stringValue("workspace1"));
execution.getPropertiesMap().set(ExecutionProperties.NAME, stringValue("MNIST"));
execution.setLastKnownState(Execution.State.RUNNING);
// 4: "kubeflow.org/alpha/execution"
execution.setTypeId(4);