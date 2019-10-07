import IGeyserInput from '../interfaces/IGeyserInput';

import { updateResourcesWithGeysers } from './resourceUtils';

export const addGeyser = (resources, geysers, geyser) => {
  const newGeysers = addGeyserToGeysers(geysers, geyser);
  const newResources = updateResourcesWithGeysers(resources, newGeysers);
  return {
    resources: newResources,
    geysers: newGeysers,
  };
};

export const deleteGeyser = (resources, geysers, geyser) => {
  const newGeysers = deleteGeyserFromGeysers(geysers, geyser);
  const newResources = updateResourcesWithGeysers(resources, newGeysers);
  return {
    resources: newResources,
    geysers: newGeysers,
  };
};

export const clearGeyserInputs = (resources, geysers) => {
  const newGeysers = getGeysersWithClearedInputs(geysers);
  return {
    resources: updateResourcesWithGeysers(resources, newGeysers),
    geysers: newGeysers,
  };
};

// --------------------------------------------------------------

export function getGeysers(geysers, inputs: IGeyserInput[]) {
  if (inputs && inputs.length > 0) {
    return updateGeysersWithInputs(geysers, inputs);
  } else {
    return getGeysersWithDefaultInputs(geysers);
  }
}

function updateGeysersWithInputs(geysers, inputs: IGeyserInput[]) {
  return {
    listing: geysers,
    inputted: inputs.map(input => {
      const geyser = geysers.find(g => g.name === input.name);
      return {
        ...input,
        outputs: geyser.outputs,
      };
    }),
  };
}

function getGeysersWithDefaultInputs(geysers) {
  return { listing: geysers, inputted: [] };
}

export function getGeysersWithClearedInputs(geysers) {
  return getGeysersWithDefaultInputs(geysers.listing);
}

export function addGeyserToGeysers(geysers, geyser) {
  if (!geysers.inputted || !geyser) return geysers;

  const inputted = [...geysers.inputted];
  inputted.push({ ...geyser });

  const newGeysers = { ...geysers, inputted };

  saveToLocalStorage(newGeysers);
  return newGeysers;
}

export function deleteGeyserFromGeysers(geysers, geyser) {
  const inputted = geysers.inputted.filter(input => input !== geyser);
  const newGeysers = { ...geysers, inputted };
  saveToLocalStorage(newGeysers);
  return newGeysers;
}

export function getGeyserOutputs(geysers, resourceName: string) {
  return geysers.inputted
    .map(geyser => {
      const geyserInfo = geysers.listing.find(g => g.name === geyser.name);
      if (geyserInfo === undefined) return [];

      const outputs = geyserInfo.outputs.filter(
        output => output.name === resourceName,
      );
      if (outputs.length === 0) return null;

      return outputs
        .map(output => ({
          ...output,
          geyser: geyser,
          value: getExtendedValue(geyser),
          valueExtended: getExtendedValue(geyser),
        }))
        .reduce((a, b) => a.concat(b));
    })
    .filter(output => output);
}

function getExtendedValue(geyser) {
  return (
    geyser.amount *
    (geyser.eruptionDuration / geyser.eruptionEvery) *
    (geyser.activeDuration / geyser.activeEvery)
  );
}

function saveToLocalStorage(geysers) {
  localStorage.setItem(
    'geysers',
    JSON.stringify(
      geysers.inputted.map(geyser => ({
        name: geyser.name,
        amount: geyser.amount,
        eruptionDuration: geyser.eruptionDuration,
        eruptionEvery: geyser.eruptionEvery,
        activeDuration: geyser.activeDuration,
        activeEvery: geyser.activeEvery,
      })),
    ),
  );
}
