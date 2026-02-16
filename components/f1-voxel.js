// Voxel data for the F1 car - each voxel is [x, y, z, color]
// The car is built layer by layer

const COLORS = {
  // Carbon fiber body - brightened
  bodyDark: "#2a2a4e",
  bodyMid: "#3642aa",
  bodyLight: "#4f6aff",
  // Red accents (livery) - more vibrant
  red: "#ff4570",
  redDark: "#e82e55",
  // Tire / rubber - slightly lighter
  tire: "#3c3c3c",
  tireInner: "#5a5a5a",
  // Metal parts - brighter
  metal: "#7a7a9a",
  metalLight: "#9e9ebe",
  // Floor / diffuser - lighter
  floor: "#333344",
  // Cockpit - less dark
  cockpit: "#1a1a34",
  // Front / rear wing endplates - brighter
  endplate: "#444455",
  // White accents - pure white
  white: "#ffffff",
  // Yellow detail - brighter
  yellow: "#ffdd55",
}

const C = COLORS

function fillRow(z, y, xFrom, xTo, color) {
  const voxels = []
  for (let x = xFrom; x <= xTo; x++) {
    voxels.push([x, y, z, color])
  }
  return voxels
}

function fillRect(z, y, xFrom, xTo, zTo, color) {
  const voxels = []
  for (let zz = z; zz <= zTo; zz++) {
    for (let x = xFrom; x <= xTo; x++) {
      voxels.push([x, y, zz, color])
    }
  }
  return voxels
}

export function generateF1Voxels() {
  const voxels = []

  // Car orientation: Z = length (front to back), X = width, Y = height
  // Front of car is -Z, rear is +Z
  // Car is approx 30 long (z: -15 to +15), 8 wide (x: -4 to +4), 6 tall

  // =====================
  // FRONT WING (z = -15 to -12, y = 0-1)
  // =====================
  // Main plane - wide front wing
  voxels.push(...fillRect(-15, 0, -6, 6, -14, C.bodyDark))
  voxels.push(...fillRect(-15, 1, -6, 6, -14, C.red))
  // Endplates
  for (let z = -15; z <= -13; z++) {
    voxels.push([-7, 0, z, C.endplate])
    voxels.push([-7, 1, z, C.endplate])
    voxels.push([-7, 2, z, C.endplate])
    voxels.push([7, 0, z, C.endplate])
    voxels.push([7, 1, z, C.endplate])
    voxels.push([7, 2, z, C.endplate])
  }
  // Nose tip connection
  voxels.push(...fillRow(-13, 1, -2, 2, C.red))
  voxels.push(...fillRow(-13, 0, -2, 2, C.bodyDark))

  // =====================
  // NOSE CONE (z = -12 to -8, y = 1-3)
  // =====================
  // Tapers from front wing up to the monocoque
  // y=1 floor
  voxels.push(...fillRect(-12, 1, -2, 2, -9, C.bodyDark))
  // y=2 top of nose
  voxels.push(...fillRect(-12, 2, -1, 1, -11, C.bodyMid))
  voxels.push(...fillRect(-10, 2, -2, 2, -9, C.bodyMid))
  // Red stripe on nose
  voxels.push(...fillRow(-12, 2, -1, 1, C.red))
  voxels.push(...fillRow(-11, 2, -1, 1, C.red))
  // y=3 narrow top
  voxels.push(...fillRect(-10, 3, -1, 1, -9, C.bodyLight))

  // =====================
  // FRONT SUSPENSION ARMS (z = -10 to -8)
  // =====================
  for (let z = -10; z <= -8; z++) {
    voxels.push([-3, 1, z, C.metal])
    voxels.push([3, 1, z, C.metal])
  }

  // =====================
  // FRONT TIRES (z = -11 to -8)
  // =====================
  // Left front tire
  for (let z = -11; z <= -8; z++) {
    for (let y = 0; y <= 3; y++) {
      if (y === 0 || y === 3) {
        voxels.push([-5, y, z, C.tire])
        voxels.push([-4, y, z, C.tire])
      } else {
        voxels.push([-6, y, z, C.tire])
        voxels.push([-5, y, z, C.tireInner])
        voxels.push([-4, y, z, C.tire])
        voxels.push([-3, y, z, C.tire])
      }
    }
  }
  // Right front tire
  for (let z = -11; z <= -8; z++) {
    for (let y = 0; y <= 3; y++) {
      if (y === 0 || y === 3) {
        voxels.push([5, y, z, C.tire])
        voxels.push([4, y, z, C.tire])
      } else {
        voxels.push([6, y, z, C.tire])
        voxels.push([5, y, z, C.tireInner])
        voxels.push([4, y, z, C.tire])
        voxels.push([3, y, z, C.tire])
      }
    }
  }

  // =====================
  // MONOCOQUE / CHASSIS (z = -8 to +4, y = 1-4)
  // =====================
  // Floor (y=1)
  voxels.push(...fillRect(-8, 1, -3, 3, 4, C.floor))
  // Lower sides (y=2)
  for (let z = -8; z <= 4; z++) {
    voxels.push([-3, 2, z, C.bodyDark])
    voxels.push([3, 2, z, C.bodyDark])
    voxels.push([-2, 2, z, C.bodyMid])
    voxels.push([2, 2, z, C.bodyMid])
    // center floor visible at y=2
    voxels.push([-1, 2, z, C.bodyMid])
    voxels.push([0, 2, z, C.bodyMid])
    voxels.push([1, 2, z, C.bodyMid])
  }
  // Upper bodywork (y=3)
  for (let z = -8; z <= 4; z++) {
    voxels.push([-3, 3, z, C.bodyDark])
    voxels.push([3, 3, z, C.bodyDark])
  }

  // =====================
  // SIDEPODS (z = -4 to +3, y = 2-4)
  // =====================
  // Sidepod intakes (wider section)
  for (let z = -4; z <= 3; z++) {
    // Left sidepod
    voxels.push([-4, 2, z, C.bodyDark])
    voxels.push([-4, 3, z, C.bodyMid])
    if (z >= -3 && z <= 2) {
      voxels.push([-4, 4, z, C.bodyLight])
    }
    // Right sidepod
    voxels.push([4, 2, z, C.bodyDark])
    voxels.push([4, 3, z, C.bodyMid])
    if (z >= -3 && z <= 2) {
      voxels.push([4, 4, z, C.bodyLight])
    }
  }
  // Sidepod tops
  for (let z = -3; z <= 2; z++) {
    voxels.push(...fillRow(z, 4, -3, 3, C.bodyLight))
  }

  // Sidepod inlets (red highlights at front)
  voxels.push([-4, 3, -4, C.red])
  voxels.push([-4, 4, -4, C.red])
  voxels.push([4, 3, -4, C.red])
  voxels.push([4, 4, -4, C.red])

  // =====================
  // COCKPIT (z = -7 to -2, y = 3-5)
  // =====================
  // Cockpit opening (sunken area)
  for (let z = -7; z <= -3; z++) {
    voxels.push([-1, 3, z, C.cockpit])
    voxels.push([0, 3, z, C.cockpit])
    voxels.push([1, 3, z, C.cockpit])
  }
  // Cockpit rim
  for (let z = -7; z <= -3; z++) {
    voxels.push([-2, 3, z, C.bodyMid])
    voxels.push([2, 3, z, C.bodyMid])
  }
  voxels.push(...fillRow(-7, 3, -2, 2, C.bodyMid))
  voxels.push(...fillRow(-3, 3, -2, 2, C.bodyMid))

  // Halo (y=4-5)
  // Front of halo
  voxels.push(...fillRow(-7, 4, -1, 1, C.metal))
  voxels.push(...fillRow(-7, 5, -1, 1, C.metalLight))
  // Sides of halo
  for (let z = -6; z <= -3; z++) {
    voxels.push([-2, 4, z, C.metal])
    voxels.push([2, 4, z, C.metal])
  }
  // Top halo bar
  voxels.push(...fillRow(-5, 5, -2, 2, C.metalLight))

  // Headrest behind cockpit
  voxels.push([0, 4, -3, C.bodyDark])
  voxels.push([0, 5, -3, C.red])
  voxels.push([-1, 4, -3, C.bodyDark])
  voxels.push([1, 4, -3, C.bodyDark])

  // =====================
  // AIRBOX / ENGINE COVER (z = -3 to +4, y = 4-6)
  // =====================
  // Airbox intake (above driver's head)
  voxels.push([0, 5, -4, C.bodyDark])
  voxels.push([0, 6, -4, C.red])
  voxels.push([-1, 5, -4, C.bodyDark])
  voxels.push([1, 5, -4, C.bodyDark])

  // Engine cover (shark fin area, y=5)
  for (let z = -3; z <= 4; z++) {
    voxels.push([0, 5, z, C.bodyLight])
    if (z <= 2) {
      voxels.push([-1, 5, z, C.bodyMid])
      voxels.push([1, 5, z, C.bodyMid])
    }
  }
  // Red racing stripe along the top
  for (let z = -2; z <= 3; z++) {
    voxels.push([0, 6, z, C.red])
  }

  // =====================
  // REAR SUSPENSION (z = 5 to 7)
  // =====================
  for (let z = 5; z <= 7; z++) {
    voxels.push([-3, 1, z, C.metal])
    voxels.push([3, 1, z, C.metal])
    voxels.push([-3, 2, z, C.metal])
    voxels.push([3, 2, z, C.metal])
  }
  // Gearbox / rear structure
  voxels.push(...fillRect(5, 2, -2, 2, 8, C.bodyDark))
  voxels.push(...fillRect(5, 3, -1, 1, 7, C.bodyDark))

  // =====================
  // REAR TIRES (z = 5 to 9)
  // =====================
  // Left rear tire (slightly wider than fronts)
  for (let z = 5; z <= 9; z++) {
    for (let y = 0; y <= 3; y++) {
      if (y === 0 || y === 3) {
        voxels.push([-5, y, z, C.tire])
        voxels.push([-4, y, z, C.tire])
      } else {
        voxels.push([-7, y, z, C.tire])
        voxels.push([-6, y, z, C.tire])
        voxels.push([-5, y, z, C.tireInner])
        voxels.push([-4, y, z, C.tire])
      }
    }
  }
  // Right rear tire
  for (let z = 5; z <= 9; z++) {
    for (let y = 0; y <= 3; y++) {
      if (y === 0 || y === 3) {
        voxels.push([5, y, z, C.tire])
        voxels.push([4, y, z, C.tire])
      } else {
        voxels.push([7, y, z, C.tire])
        voxels.push([6, y, z, C.tire])
        voxels.push([5, y, z, C.tireInner])
        voxels.push([4, y, z, C.tire])
      }
    }
  }

  // =====================
  // DIFFUSER (z = 8 to 10, y = 1-2)
  // =====================
  voxels.push(...fillRect(8, 1, -3, 3, 10, C.floor))
  voxels.push(...fillRow(9, 2, -2, 2, C.bodyDark))
  voxels.push(...fillRow(10, 2, -2, 2, C.bodyDark))
  // Diffuser channels
  for (let z = 8; z <= 10; z++) {
    voxels.push([-3, 2, z, C.metal])
    voxels.push([3, 2, z, C.metal])
  }

  // =====================
  // REAR WING (z = 10 to 12, y = 3-6)
  // =====================
  // Rear wing main plane
  voxels.push(...fillRect(11, 5, -6, 6, 12, C.red))
  voxels.push(...fillRect(11, 4, -6, 6, 12, C.bodyDark))
  // Second element
  voxels.push(...fillRect(10, 6, -5, 5, 11, C.redDark))
  // DRS yellow strip
  voxels.push(...fillRow(12, 6, -4, 4, C.yellow))

  // Endplates
  for (let z = 10; z <= 12; z++) {
    for (let y = 3; y <= 6; y++) {
      voxels.push([-7, y, z, C.endplate])
      voxels.push([7, y, z, C.endplate])
    }
  }

  // Wing pillars connecting to body
  for (let y = 3; y <= 4; y++) {
    voxels.push([-1, y, 10, C.metal])
    voxels.push([1, y, 10, C.metal])
    voxels.push([0, y, 10, C.metal])
  }

  // =====================
  // REAR LIGHT (z = 12, y = 2-3)
  // =====================
  voxels.push(...fillRow(12, 3, -2, 2, C.red))
  voxels.push(...fillRow(12, 2, -1, 1, C.redDark))

  // =====================
  // NUMBER on nose (white squares)
  // =====================
  voxels.push([0, 3, -8, C.white])
  voxels.push([0, 2, -8, C.yellow])

  // =====================
  // FLOOR DETAILS (bargeboards, floor edges)
  // =====================
  // Bargeboard area (z = -6 to -4)
  for (let z = -6; z <= -4; z++) {
    voxels.push([-3, 1, z, C.metal])
    voxels.push([3, 1, z, C.metal])
  }

  // Plank / skid blocks
  voxels.push(...fillRow(-2, 0, -1, 1, C.yellow))
  voxels.push(...fillRow(4, 0, -1, 1, C.yellow))

  return voxels
}