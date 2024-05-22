// src/app/actions.ts
import p5, { Group, Sprite, Canvas, Vector } from 'p5';

const boids: p5.Group = new p5.Group();
const num_boids: number = 50;
const centering_factor: number = 0.001;
const rotation_alignment_factor: number = 0.5;
const min_speed: number = 5;
const max_speed: number = 10;
const speed_control_factor: number = 1.05;
const acceleration_factor: number = 1.01;
const direction_change_factor: number = 3;
const keep_position_in_box_factor: number = 1;
const margin_size: number = 20;
let obstacle: p5.Sprite = new p5.Sprite(xmax / 2, ymax / 2);
const obst_diam: number = 150;
const user_agent_string: string = navigator.userAgent;
const mobile_regexp: RegExp = /android|iphone|kindle|ipad/i;
const isMobileDevice: boolean = mobile_regexp.test(user_agent_string);
let xmax: number = 350;
let ymax: number = 600;

function setup(p: p5) {
  p.createCanvas(p.displayWidth, p.displayHeight);
  p.world.gravity.y = 0;
  obstacle.diameter = obst_diam;
  obstacle.collider = 'kinematic'; // 'dynamic';
  obstacle.rotationLock = true;
  obstacle.color = 'white';
  obstacle.textSize = 16;

  const box = new p5.Sprite([
    [1, 1],
    [xmax, 1],
    [xmax, ymax],
    [1, ymax],
    [1, 1]
  ]);
  box.collider = 'static';
  box.shape = 'chain';

  boids.collider = 'dynamic';
  boids.color = 'skyblue';
  boids.neighbourCount = 0;
  boids.rotationDrag = 10;

  for (let i = 0; i < num_boids; i++) {
    const this_x = 100 + 250 * p.random();
    const this_y = 100 + 250 * p.random();
    const boid = new boids.Sprite(this_x, this_y,
      [[20, -5], [-20, -5], [0, 10]]);
    boid.addSensor(50, 0, 100);
    boid.vel.x = -3 + 6 * p.random();
    boid.vel.y = -3 + 6 * p.random();
  }
}

function draw(p: p5) {
  p.clear();
  let xvel_sum: number = 0;
  let yvel_sum: number = 0;
  let xpos_sum: number = 0;
  let ypos_sum: number = 0;
  for (let i = 0; i < num_boids; i++) {
    const this_boid = boids[i];
    xvel_sum += this_boid.vel.x;
    yvel_sum += this_boid.vel.y;
    xpos_sum += this_boid.x;
    ypos_sum += this_boid.y;
  }
  const xvel_mean: number = xvel_sum / num_boids;
  const yvel_mean: number = yvel_sum / num_boids;
  const direction_mean: number = Math.atan2(yvel_mean, xvel_mean);
  const xpos_mean: number = xpos_sum / num_boids;
  const ypos_mean: number = ypos_sum / num_boids;

  for (let i = 0; i < num_boids; i++) {
    const this_boid = boids[i];
    this_boid.rotateTowards(direction_mean, rotation_alignment_factor);
    this_boid.vel.x += (xpos_mean - this_boid.x) * centering_factor;
    this_boid.vel.y += (ypos_mean - this_boid.y) * centering_factor;
    if (this_boid.x < margin_size) {
      this_boid.x += keep_position_in_box_factor;
      this_boid.direction += direction_change_factor;
    }
    if (this_boid.x > xmax - margin_size) {
      this_boid.x -= keep_position_in_box_factor;
      this_boid.direction += direction_change_factor;
    }
    if (this_boid.y < margin_size) {
      this_boid.y += keep_position_in_box_factor;
      this_boid.direction += direction_change_factor;
    }
    if (this_boid.y > ymax - margin_size) {
      this_boid.y -= keep_position_in_box_factor;
      this_boid.direction += direction_change_factor;
    }
    if (this_boid.speed < min_speed) {
      this_boid.speed *= speed_control_factor;
    }
    if (this_boid.speed > max_speed) {
      this_boid.speed *= (1 - speed_control_factor);
    }
    this_boid.rotateTowards(this_boid.direction, 1);
    if (this_boid.overlapping(box)) {
      this_boid.direction += direction_change_factor;
    }
    this_boid.speed *= acceleration_factor;
  }

  if (isMobileDevice === false) {
    if (obstacle.mouse.dragging()) {
      obstacle.moveTowards(
        p.mouse.x + obstacle.mouse.x,
        p.mouse.y + obstacle.mouse.y,
        1
      );
    }
  } else {
    if (obstacle.mouse.hovering()) {
      obstacle.moveTowards(
        p.mouse.x + obstacle.mouse.x,
        p.mouse.y + obstacle.mouse.y,
        1
      );
    }
  }

  obstacle.x = Math.min(obstacle.x, xmax);
  obstacle.x = Math.max(obstacle.x, 1);
  obstacle.y = Math.min(obstacle.y, ymax);
  obstacle.y = Math.max(obstacle.y, 1);
}