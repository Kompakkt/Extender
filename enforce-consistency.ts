import { readFile, writeFile } from 'fs/promises';

const enforceVersionConsistency = async () => {
  console.log('Checking version consistency...');
  const packageInfo = await readFile('./package.json', { encoding: 'utf8' });
  const parsed = JSON.parse(packageInfo);

  const hasVersion = (obj: unknown): obj is { version: string } => {
    return typeof obj === 'object' && obj !== null && 'version' in obj;
  };

  if (!hasVersion(parsed)) {
    throw new Error('Missing version in package.json');
  }

  const extenderPackageInfo = await readFile('./projects/extender/package.json', {
    encoding: 'utf8',
  });
  const extenderParsed = JSON.parse(extenderPackageInfo);

  if (!hasVersion(extenderParsed)) {
    throw new Error('Missing version in projects/extender/package.json');
  }

  if (parsed.version === extenderParsed.version) {
    console.log('Version is consistent, no action required');
    return;
  }

  extenderParsed.version = parsed.version;

  await writeFile('./projects/extender/package.json', JSON.stringify(extenderParsed, null, 2));
  console.log(`Wrote version ${parsed.version} to projects/extender/package.json`);
};

const enforceSameReadme = async () => {
  console.log('Checking readme consistency...');
  const readme = await readFile('./README.md', { encoding: 'utf8' });
  const extenderReadme = await readFile('./projects/extender/README.md', { encoding: 'utf8' });

  if (readme === extenderReadme) {
    console.log('Readme is consistent, no action required');
    return;
  }

  await writeFile('./projects/extender/README.md', readme);
  console.log('Wrote readme to projects/extender/README.md');
};

const main = async () => {
  await enforceVersionConsistency();
  await enforceSameReadme();
};

main();
