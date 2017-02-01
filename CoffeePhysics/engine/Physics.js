// Generated by CoffeeScript 1.6.2
/* Physics Engine
*/

var Physics;

Physics = (function() {
  function Physics(integrator) {
    this.integrator = integrator != null ? integrator : new Euler();
    this.timestep = 1.0 / 60;
    this.viscosity = 0.01;
    this.behaviours = [];
    this._time = 0.0;
    this._step = 0.0;
    this._clock = null;
    this._buffer = 0.0;
    this._maxSteps = 20;
    this.particles = [];
    this.springs = [];
  }

  /* Performs a numerical integration step.
  */

  Physics.prototype.integrate = function(dt) {
    var behaviour, drag, index, particle, spring, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _results;

    drag = 1.0 - this.viscosity;
    _ref = this.particles;
    for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
      particle = _ref[index];
  
	  if(index >= current_size.length) {
		  current_size.push(particle.radius);
		  original_size.push(particle.radius);
		  target_size.push(particle.radius);
	  }
  
	  current_size[index] = particle.radius;
  
	  if(Math.abs(target_size[index] - particle.radius) > 0.01) {
		  particle.radius += (target_size[index] - particle.radius)/64;
		  particle.mass = particle.radius/4;
	  }
  
	  _ref1 = this.behaviours;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        behaviour = _ref1[_j];
        behaviour.apply(particle, dt, index);
      }
      particle.update(dt, index);
    }
    this.integrator.integrate(this.particles, dt, drag);
   
    return _results;
  };

  /* Steps the system.
  */


  Physics.prototype.step = function() {
    var delta, i, time, _ref;

    if ((_ref = this._clock) == null) {
      this._clock = new Date().getTime();
    }
    time = new Date().getTime();
    delta = time - this._clock;
    if (delta <= 0.0) {
      return;
    }
    delta *= 0.001;
    this._clock = time;
    this._buffer += delta;
    i = 0;
    while (this._buffer >= this.timestep && ++i < this._maxSteps) {
      this.integrate(this.timestep);
      this._buffer -= this.timestep;
      this._time += this.timestep;
    }
    return this._step = new Date().getTime() - time;
  };

  /* Clean up after yourself.
  */


  Physics.prototype.destroy = function() {
    this.integrator = null;
    this.particles = null;
    return this.springs = null;
  };

  return Physics;

})();
