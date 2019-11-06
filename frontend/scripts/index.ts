import { grpc } from "@improbable-eng/grpc-web";
import { NodeHttpTransport } from "@improbable-eng/grpc-web-node-http-transport";

// Do this first, before you make any grpc requests!
grpc.setDefaultTransport(NodeHttpTransport());

import {
  GetArtifactTypesRequest,
  GetExecutionTypesRequest,
  PutArtifactsRequest,
  PutExecutionRequest,
  PutExecutionTypeRequest
} from '../src/generated/src/apis/metadata/metadata_store_service_pb';
import {Api} from '../src/lib/Api';
import {Artifact, Event, Execution, ExecutionType} from '../src/generated/src/apis/metadata/metadata_store_pb';
import ArtifactAndEvent = PutExecutionRequest.ArtifactAndEvent;
import {artifact1} from './data';
import {ServiceError} from '../src/generated/src/apis/metadata/metadata_store_service_pb_service';

// Default types:
// artifacts:
//   1: kubeflow.org/alpha/metrics
//   2: kubeflow.org/alpha/data_set
//   3: kubeflow.org/alpha/model
// executions
//   4: kubeflow.org/alpha/execution

// Use the api version because it will give your promise versions of the APIs..
const api = Api.getInstance();

const stringify = (object: any) => {
  return JSON.stringify(object, null, 2)
};

interface ResultInfo {
  error: ServiceError | null;
  method: string;
  request: any;
  response: any;
}

const logResult = ({error, method, request, response}: ResultInfo) => {
  if (error) {
    console.log(`Error in ml_metadata.${method}: ${error.message}`);
    console.log(`Request:\n${stringify(request.toObject())}`);
    return;
  }

  // @ts-ignore
  console.log(`ml_metadata.${method}Response:\n${stringify(response.toObject())}`);
};

const putArtifact = async (artifact: Artifact) => {
  const request = new PutArtifactsRequest();
  request.addArtifacts(artifact);

  const {error, response} = await api.metadataStoreService.putArtifacts(request);

  logResult({
    error,
    method: "PutArtifacts",
    request,
    response,
  });
};

const putExecution = async (execution: Execution) => {
  const event = new Event();
  event.setArtifactId(artifact1.getId() as number);

  if (execution.hasId()) {
    // Updating an existing execution
    event.setExecutionId(execution.getId() as number);
  }

  // date "+%s" * 1000
  event.setType(Event.Type.DECLARED_INPUT);
  event.setMillisecondsSinceEpoch(1573077511000);

  const artifactAndEvent = new ArtifactAndEvent();
  artifactAndEvent.setArtifact(artifact1);
  artifactAndEvent.setEvent(event);

  const request = new PutExecutionRequest();
  request.addArtifactEventPairs(artifactAndEvent);
  request.setExecution(execution);

  const {error, response} = await api.metadataStoreService.putExecution(request);

  logResult({
    error,
    method: "PutExecution",
    request,
    response,
  });
};

const putExecutionType = async (executionType: ExecutionType) => {
  const request = new PutExecutionTypeRequest();
  request.setExecutionType(executionType);

  const {error, response} = await api.metadataStoreService.putExecutionType(request);

  logResult({
    error,
    method: "PutExecutionType",
    request,
    response,
  });
};

const getExecutionTypes = async () => {
  const request = new GetExecutionTypesRequest();

  const {error, response} = await api.metadataStoreService.getExecutionTypes(request);

  logResult({
    error,
    method: "GetExecutionTypes",
    request,
    response,
  });
};

const getArtifactTypes = async () => {
  const request = new GetArtifactTypesRequest();

  const {error, response} = await api.metadataStoreService.getArtifactTypes(request);

  logResult({
    error,
    method: "GetArtifactTypes",
    request,
    response,
  });
};

// @ts-ignore
const methods = {
  getArtifactTypes,
  getExecutionTypes,
  putArtifact,
  putExecution,
  putExecutionType,
};

