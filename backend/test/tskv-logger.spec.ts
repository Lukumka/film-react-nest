import { TskvLogger } from '../src/logger/tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(logger).toBeDefined();
  });

  it('should log formatted message', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();

    logger.log('Hello');

    expect(spy).toHaveBeenCalledTimes(1);

    const output = spy.mock.calls[0][0];

    expect(output).toContain('level=log');
    expect(output).toContain('message=Hello');
    expect(output).toContain('optionalParams=[]');
    expect(output).toContain('timestamp=');
  });

  it('should log object as JSON', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();

    logger.log({ id: 1, name: 'Film' });

    const output = spy.mock.calls[0][0];

    expect(output).toContain('message={"id":1,"name":"Film"}');
  });

  it('should escape special characters', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();

    logger.log('line1\nline2\ttext');

    const output = spy.mock.calls[0][0];

    expect(output).toContain('line1\\nline2\\ttext');
  });

  it('should call console.error', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    logger.error('Error');

    expect(spy).toHaveBeenCalledTimes(1);

    const output = spy.mock.calls[0][0];

    expect(output).toContain('level=error');
    expect(output).toContain('message=Error');
  });

  it('should call console.warn', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation();

    logger.warn('Warning');

    expect(spy).toHaveBeenCalledTimes(1);

    const output = spy.mock.calls[0][0];

    expect(output).toContain('level=warn');
  });

  it('should call console.debug', () => {
    const spy = jest.spyOn(console, 'debug').mockImplementation();

    logger.debug('Debug');

    expect(spy).toHaveBeenCalledTimes(1);

    const output = spy.mock.calls[0][0];

    expect(output).toContain('level=debug');
  });

  it('should log verbose messages', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();

    logger.verbose('Verbose');

    expect(spy).toHaveBeenCalledTimes(1);

    const output = spy.mock.calls[0][0];

    expect(output).toContain('level=verbose');
    expect(output).toContain('message=Verbose');
  });

  it('should include optional params', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();

    logger.log('Hello', 'param1', 123);

    const output = spy.mock.calls[0][0];

    expect(output).toContain('optionalParams=["param1",123]');
  });
});
