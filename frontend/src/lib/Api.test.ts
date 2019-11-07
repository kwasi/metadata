import {Api} from './Api';

describe('Api', () => {
  it('Returns a singleton instance with a metadata store service', () => {
    const api = Api.getInstance();
    expect(api).toBeInstanceOf(Api);
    expect(api.metadataStoreService).toBeDefined();
    expect(api).toBe(Api.getInstance());
  });
});
