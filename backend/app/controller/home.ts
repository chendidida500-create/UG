import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = 'Welcome to UG Backend System';
  }
  
  public async health() {
    const { ctx } = this;
    ctx.body = {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}