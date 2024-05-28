/**
 * NOTE:
 *  This $ function requires
 *  the `bun` package to be installed globally.
 *  curl -fsSL https://bun.sh/install | bash`
 *  tested with bun v1.1.10
 */
import { $ } from 'bun';

import { parseArgs } from './params';

// Parse the command line arguments for action flags
const {
  repo = process.env.DOCKER_REPOSITORY, // The docker repo
  push, // Build and push the image
  pull, // Pull and restart
  build, // Build the image
  run, // Run container
} = parseArgs();

(async () => {
  // Build steps
  if (build || push) {
    console.log('Building docker image');
    await $`docker build -t ${repo} .`;
  }

  // Run steps
  if (run) {
    console.log('Running docker container');
    await $`docker run -p 3000:3000 ${repo}`;
  }

  // Pull steps
  if (push) {
    await $`docker login`;
    console.log('Pushing docker image');
    await $`docker push ${repo}`;
  }

  // Pull steps
  if (pull) {
    await $`docker login`;
    console.log('Pulling docker image');
    await $`docker pull ${repo}:latest`;
    console.log('Restarting docker image');
    await $`docker restart ${repo}`;
  }
  console.log('Done');
})().catch((e) => console.error(e.message));
