import Board from './board'
import Led from './led'
import Stage from './stage'

import { Connectable, ConnectableModel } from './connectable'
import {
  Momentary,
  MomentaryModel,
  Switch,
  SwitchModel,
  Toggle,
  ToggleModel,
} from './footswitch'
import { FileInput, Input, Output, StreamInput } from './io'
import { Linear, LinearModel, Log, LogModel, Pot, PotModel } from './pot'
import {
  Box,
  BoxModel,
  Cabinet,
  CabinetModel,
  Conv,
  ConvModel,
  Delay,
  DelayModel,
  Overdrive,
  OverdriveModel,
  Reverb,
  ReverbModel,
  Volume,
  VolumeModel,
} from './stomp'
import Component from './ui/Component'

// window['AudioContext'] = window['AudioContext'] || window['webkitAudioContext']

export default {
  Board,
  Led,
  Stage,
  connectable: {
    Connectable,
    ConnectableModel,
  },
  footswitch: {
    Momentary,
    MomentaryModel,
    Switch,
    SwitchModel,
    Toggle,
    ToggleModel,
  },
  io: {
    FileInput,
    Input,
    Output,
    StreamInput,
  },
  pot: {
    Linear,
    LinearModel,
    Log,
    LogModel,
    Pot,
    PotModel,
  },
  stomp: {
    Box,
    BoxModel,
    Cabinet,
    CabinetModel,
    Conv,
    ConvModel,
    Delay,
    DelayModel,
    Overdrive,
    OverdriveModel,
    Reverb,
    ReverbModel,
    Volume,
    VolumeModel,
  },
  ui: {
    Component,
  },
}
