/*
 * @Descripttion: 获取并缓存远程配置，（由于后端配置表比较多，没有统一的表，每个表都是单独的接口）
 * @version:
 * @Author: lihw02
 * @Date: 2020-07-20 18:36:10
 * @LastEditors: lihw02
 * @LastEditTime: 2020-07-21 16:53:11
 */
import Vue from 'vue';
import api from '../../src/api';
import { isEmpty } from '../../src/utils/index.js';

class Configurator {
  constructor (params) {
    this.config = {

    };
    this.params = {
      ...params
    };
  }
  // key: t_config:field 或 field
  async getConfig (key) {
    const keys = key.split(':');
    let table = '';
    let field = '';
    if (keys.length == 2) {
      table = keys[0];
      field = keys[1];
    } else {
      // 默认为c_config
      table = 't_config';
      field = keys[0];
    }

    // 重组
    const tableField = `${table}:${field}`;

    let configValue;
    configValue = this.config[tableField];
    console.log(configValue, 'configValue');
    // 是否已经缓存配置
    if (!isEmpty(configValue)) {
      console.log(table);
      // 返回配置
      return configValue;
    }

    // 获取远程配置
    if (table === 'c_config') {
      return await this.requestCConfig(tableField, field);
    } else if (table === 't_config') {
      return await this.requestTConfig(tableField, field);
    }
  }

  // c_config
  requestCConfig (tableField, field) {
    const params = {
      key: field,
    };

    return Vue.$http.get(this.params.baseURL + api.getCommonConfig,
      { params: params, }
    )
      .then(res => {
        if (res.errcode === 0) {
          if (res.data) {
            this.config[tableField] = res.data.value;
            return Promise.resolve(res.data.value);
          }
        }
        return Promise.resolve('');
      }).catch(() => {
        return Promise.resolve('');
      });
  }

  // t_config
  requestTConfig (tableField, field) {
    const params = {
      paramKey: field,
    };
    console.log('234324324');
    return Vue.$http.get(this.params.baseURL + api.getConfigParam,
      { params: params, }
    )
      .then(res => {
        if (res.errcode === 0) {
          if (res.data) {
            this.config[tableField] = res.data;
            return Promise.resolve(res.data);
          }
        }
        return Promise.resolve('');
      }).catch(() => {
        return Promise.resolve('');
      });
  }

  // TODO 更多配置表
}

function configInstance (options) {
  const config = new Configurator({
    baseURL: options.baseURL
  });

  return {
    async getConfig (key) {
      return await config.getConfig(key);
    }
  };
}

export default configInstance;
