import YAML from 'yamljs'

export const loadEnvFromYml = (path:string):void => {
  const envVars = YAML.load(path).environment;
  Object.keys(envVars).forEach(v => {
    process.env[v] = envVars[v];
  });
}
