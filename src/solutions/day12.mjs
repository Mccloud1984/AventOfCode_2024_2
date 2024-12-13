"strict";
import { importDayData } from "../utils/fileIO.mjs";

const text = importDayData(12);
const rows = text.split("\r\n");
console.log(rows.length);

function withinLocations(locations, checkLocation) {
  const [crow, ccol] = checkLocation;
  return locations.find(
    ([rowIndex, columnIndex]) => rowIndex === crow && columnIndex == ccol
  );
}

function getCheckLocations(location, gridWidth, gridHeight, previousLocations) {
  const checkLocations = [];
  let perimeters = 0;
  const [rowIndex, columnIndex] = location;
  const possCheckLocations = [
    [rowIndex + 1, columnIndex],
    [rowIndex - 1, columnIndex],
    [rowIndex, columnIndex + 1],
    [rowIndex, columnIndex - 1],
  ];
  for (const nextLoc of possCheckLocations) {
    const [nextRow, nextCol] = nextLoc;
    if (
      nextRow < gridHeight &&
      nextRow >= 0 &&
      nextCol < gridWidth &&
      nextCol >= 0
    ) {
      //   if (!withinLocations(previousLocations, nextLoc))
      checkLocations.push(nextLoc);
    } else {
      perimeters++;
    }
  }

  return { checkLocations, perimeters };
}

function mapRegion(regionValue, startingLocation, grid, previousLocations) {
  let { checkLocations, perimeters } = getCheckLocations(
    startingLocation,
    grid[0].length,
    grid.length,
    previousLocations
  );
  const ret = [];

  for (const [rowIndex, columnIndex] of checkLocations) {
    const nextLocation = grid[rowIndex][columnIndex];
    console.log(
      `Checking next location of ${nextLocation}: ${rowIndex},${columnIndex}`
    );
    if (nextLocation === regionValue) {
      if (withinLocations(previousLocations, [rowIndex, columnIndex])) continue;
      previousLocations.push([rowIndex, columnIndex]);
      console.log(`Found next region of ${rowIndex},${columnIndex}`);
      const foundRegions = mapRegion(
        regionValue,
        [rowIndex, columnIndex],
        grid,
        previousLocations
      );
      ret.push(...foundRegions.region);
      previousLocations = [
        ...previousLocations,
        ...foundRegions.previousLocations.filter(
          ([row, col]) =>
            !previousLocations.find(
              ([prow, pcol]) => row == prow && col == pcol
            )
        ),
      ];
    } else {
      perimeters++;
    }
  }

  ret.unshift({
    // cell: regionValue,
    location: startingLocation,
    perimeters,
  });
  return { region: ret, previousLocations };
}
try {
  const regions = [];
  let totalPrice = 0;
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex];
    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const cell = row[columnIndex];
      const location = [rowIndex, columnIndex];

      let foundRegion = undefined;
      for (const region of regions) {
        foundRegion = region.cells.find(
          ([crow, ccol]) => crow === rowIndex && ccol === columnIndex
        );
        if (foundRegion) break;
      }
      if (!foundRegion) {
        console.log(
          `Starting at cell ${cell} at location ${rowIndex},${columnIndex}`
        );
        const { region } = mapRegion(cell, location, rows, [location]);
        let perimeter = 0;
        region.forEach((cell) => (perimeter += cell.perimeters));
        totalPrice += perimeter * region.length;
        console.log(
          `Price of region ${
            perimeter * region.length
          } cell count of ${JSON.stringify(
            region.map((x) => x.location).length
          )}`
        );
        regions.push({
          value: cell,
          // startingLocation: location,
          cells: region.map((x) => x.location),
        });
      }
    }
  }

  // let total = 0;
  // regions.forEach((region) => {
  //   const area = region.cells.length;
  //   let perimeter = 0;
  //   region.cells.forEach((cell) => (perimeter += cell.perimeters));
  //   total += perimeter * area;
  // });
  // console.log(JSON.stringify(regions));
  console.log("TotalPrice =", totalPrice);
} catch (error) {
  console.error(error);
}
