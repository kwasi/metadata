import { grpc } from "@improbable-eng/grpc-web";
import { NodeHttpTransport } from "@improbable-eng/grpc-web-node-http-transport";

// Do this first, before you make any grpc requests!
grpc.setDefaultTransport(NodeHttpTransport());

import {PutArtifactsRequest} from '../src/generated/src/apis/metadata/metadata_store_service_pb';
import {Api, ArtifactCustomProperties} from '../src/lib/Api';
import {Artifact} from '../src/generated/src/apis/metadata/metadata_store_pb';
import {stringValue} from '../src/TestUtils';

// Use the api version because it has a a Promise client.
const api = Api.getInstance();

const stringify = (object: any) => {
  return JSON.stringify(object, null, 2)
};

const putArtifact = async (artifact: Artifact) => {
  const request = new PutArtifactsRequest();
  request.addArtifacts(artifact);
  const {error, response} = await api.metadataStoreService.putArtifacts(request);

  if (error) {
    console.log(`Error in ml_metadata.PutArtifacts: ${error.message}`);
    console.log(`Request:\n${stringify(request.toObject())}`);
    return;
  }

  // @ts-ignore
  console.log(`ml_metadata.PutArtifactsResponse:\n${stringify(response.toObject())}`);
};

// Test model
const artifact1 = new Artifact();
artifact1.setId(1);
artifact1.setTypeId(3);
artifact1.setUri('gs://my-bucket/mnist');
const artifact1PropertiesMap = artifact1.getPropertiesMap();
artifact1PropertiesMap.set('name', stringValue('model'));
// Don't include pipeline_name, we use it in tests, but it throws an error
// artifact1PropertiesMap.set('pipeline_name', stringValue('pipeline-1'));
artifact1PropertiesMap.set('version', stringValue('v0'));
artifact1PropertiesMap.set('create_time', stringValue('2019-06-12T01:21:48.259263Z'));
artifact1.getCustomPropertiesMap().set(ArtifactCustomProperties.WORKSPACE, stringValue('workspace-1'));

putArtifact(artifact1);
