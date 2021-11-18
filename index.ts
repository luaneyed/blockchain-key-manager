import fs from 'fs';
import os from 'os';
import path from 'path';

const runCatching = <T>(block: () => T, fallback: T) => {
  try {
    return block();
  } catch {
    return fallback;
  }
};

interface EOA {
  alias: string
  address: string
  privateKey: string
}

enum State {
  FindingAlias,
  FindingAddress,
  FindingPrivateKey,
}

const throwFormatError = () => { throw new Error('File format error : .blockchain/eoa') };

const getEoaList = () => {
  const lines = runCatching(
    () => fs.readFileSync(path.join(os.homedir(), '.blockchain/eoa')).toString(),
    '',
  ).split('\n');

  const result: EOA[] = [];
  let state = State.FindingAlias;
  let alias = '';
  let address = '';
  for (const l of lines) {
    if (l.startsWith('[') && l.endsWith(']')) {
      if (state !== State.FindingAlias) {
        throwFormatError();
      }
      alias = l.substring(1, l.length - 1);
      state = State.FindingAddress;
    } else {
      const [a, b] = l.split('=');
      if (a === 'address') {
        if (state !== State.FindingAddress) {
          throwFormatError();
        }
        address = b;
        state = State.FindingPrivateKey;
      } else if (a === 'private_key') {
        if (state !== State.FindingPrivateKey) {
          throwFormatError();
        }
        result.push({ alias, address, privateKey: b });
        state = State.FindingAlias;
      }
    }
  }

  if (state !== State.FindingAlias) {
    throwFormatError();
  }
  return result;
}

export const getEoa = (alias: string) => getEoaList().find((eoa) => eoa.alias === alias);
export const getAddress = (alias: string) => getEoa(alias)?.address;
export const getPrivateKey = (alias: string) => getEoa(alias)?.privateKey;
