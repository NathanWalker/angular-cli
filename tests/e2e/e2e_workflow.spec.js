'use strict';

var fs            = require('fs');
var path          = require('path');
var tmp           = require('../helpers/tmp');
var chai          = require('chai');
var expect        = chai.expect;
var conf          = require('ember-cli/tests/helpers/conf');
var sh            = require('shelljs');
var ng            = require('../helpers/ng');
var root          = path.join(process.cwd(), 'tmp');

describe('Basic end-to-end Workflow', function () {
  before(conf.setup);

  after(conf.restore);

  it('Installs angular-cli correctly', function() {
    this.timeout(300000);

    return tmp.setup('./tmp')
      .then(function () {
        process.chdir('./tmp');

        sh.exec('npm i angular-cli -g -C ' + process.cwd(), { silent: true });
        expect(fs.existsSync(path.join(process.cwd(), 'bin', 'ng')));
      });
  });

  it('Can create new project using `ng new test-project`', function() {
    this.timeout(300000);

    return ng([
      'new',
      'test-project',
      '--silent'
    ]).then(function() {
      expect(fs.existsSync(path.join(root, 'test-project')));
    });
  });

  it('Can change current working directory to `test-project`', function() {
    process.chdir(path.join(root, 'test-project'));
    expect(path.basename(process.cwd())).to.equal('test-project');
  });

  it('Can run `ng build` in created project', function() {
    this.timeout(10000);

    return ng([
      'build',
      '--silent'
    ]).then(function() {
      expect(fs.existsSync(path.join(process.cwd(), 'dist')));
    });
  });

  it('Perform `ng test`', function(done) {
    this.timeout(30000);

    return ng([
      'test'
    ]).then(function(err) {
      // TODO when `ng test` will be implemented
      //expect(err).to.be.equal(1);
      done();
    });
  });

  it('Can create a test component using `ng generate component test-component`', function() {
    return ng([
      'generate',
      'component',
      'test-component'
    ]).then(function() {
      var componentDir = path.join(process.cwd(), 'src', 'app', 'components', 'test-component');
      expect(fs.existsSync(componentDir));
      expect(fs.existsSync(path.join(componentDir, 'test-component.ts')));
      expect(fs.existsSync(path.join(componentDir, 'test-component.html')));
      expect(fs.existsSync(path.join(componentDir, 'test-component.css')));
    });
  });

  it('Perform `ng test`', function(done) {
    this.timeout(30000);

    return ng([
      'test'
    ]).then(function(err) {
      // TODO when `ng test` will be implemented
      //expect(err).to.be.equal(1);
      done();
    });
  });

  it('Can create a test service using `ng generate service test-service`', function() {
    return ng([
      'generate',
      'service',
      'test-service'
    ]).then(function() {
      var serviceDir = path.join(process.cwd(), 'src', 'app', 'services', 'test-service');
      expect(fs.existsSync(serviceDir));
      expect(fs.existsSync(path.join(serviceDir, 'test-service.ts')));
      expect(fs.existsSync(path.join(serviceDir, 'test-service.spec.ts')));
    });
  });

  it('Perform `ng test`', function(done) {
    this.timeout(30000);

    return ng([
      'test'
    ]).then(function(err) {
      // TODO when `ng test` will be implemented
      //expect(err).to.be.equal(1);
      done();
    });
  });

  it('Can create a test pipe using `ng generate pipe test-pipe`', function() {
    return ng([
      'generate',
      'pipe',
      'test-pipe'
    ]).then(function() {
      var pipeDir = path.join(process.cwd(), 'src', 'app', 'pipes', 'test-pipe');
      expect(fs.existsSync(pipeDir));
      expect(fs.existsSync(path.join(pipeDir, 'test-pipe.ts')));
      expect(fs.existsSync(path.join(pipeDir, 'test-pipe.spec.ts')));
    });
  });

  it('Perform `ng test`', function(done) {
    this.timeout(30000);

    return ng([
      'test'
    ]).then(function(err) {
      // TODO when `ng test` will be implemented
      //expect(err).to.be.equal(1);
      done();
    });
  });

  it('Can create a test route using `ng generate route test-route`', function() {
    return ng([
      'generate',
      'route',
      'test-route'
    ]).then(function() {
      var routeDir = path.join(process.cwd(), 'src', 'app', 'test-route');
      expect(fs.existsSync(routeDir));
      expect(fs.existsSync(path.join(routeDir, 'test-pipe-detail.component.css')));
      expect(fs.existsSync(path.join(routeDir, 'test-pipe-detail.component.html')));
      expect(fs.existsSync(path.join(routeDir, 'test-pipe-detail.component.spec.ts')));
      expect(fs.existsSync(path.join(routeDir, 'test-pipe-detail.component.ts')));
      expect(fs.existsSync(path.join(routeDir, 'test-pipe-list.component.css')));
      expect(fs.existsSync(path.join(routeDir, 'test-pipe-list.component.html')));
      expect(fs.existsSync(path.join(routeDir, 'test-pipe-list.component.spec.ts')));
      expect(fs.existsSync(path.join(routeDir, 'test-pipe-list.component.ts')));
      expect(fs.existsSync(path.join(routeDir, 'test-pipe-root.component.ts')));
      expect(fs.existsSync(path.join(routeDir, 'test-pipe-root.service.spec.ts')));
      expect(fs.existsSync(path.join(routeDir, 'test-pipe-root.service.ts')));
    });
  });

  it('Perform `ng test`', function(done) {
    this.timeout(300000);

    return ng([
      'test'
    ]).then(function(err) {
      // TODO when `ng test` will be implemented
      //expect(err).to.be.equal(1);
      // Clean `tmp` folder

      process.chdir(path.resolve(root, '..'));
      sh.rm('-rf', './tmp'); // tmp.teardown takes too long

      done();
    });
  });

});
