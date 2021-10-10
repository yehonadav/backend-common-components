export const runScript = async (scriptCallAsync:()=>Promise<void>) => {
  try {
    await scriptCallAsync()
  }
  catch (e) {
    console.error(e);
  }
}