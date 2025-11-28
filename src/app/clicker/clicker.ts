import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HalloweenService } from '../services/halloween';
import { NavidadService } from '../services/navidad';

@Component({
  selector: 'app-clicker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clicker.html',
  styleUrls: ['./clicker.css']
})
export class Clicker implements OnInit, OnDestroy {
  monedas: number = 0;
  monedasTotalesGeneradas: number = 0;
  monedasPorClick: number = 1;
  produccionPorSegundo: number = 0;
  multiplicadorTemporal: number = 1;

  powerupTiempoRestante = 0;
  powerupDuracion = 10000;
  powerupInterval: any = null;

  modoHalloween = false;
  modoNavidad = false;

  constructor(
    private halloweenService: HalloweenService,
    private navidadService: NavidadService
  ) {}

  upgrades = [
    { name: "Abuela", production: 1, cost: 50, count: 0 },
    { name: "Granja", production: 5, cost: 150, count: 0 },
    { name: "Fábrica", production: 20, cost: 600, count: 0 },
    { name: "Banco", production: 100, cost: 3000, count: 0 },
    { name: "Templo", production: 500, cost: 15000, count: 0 },
    { name: "Portal Mágico", production: 2000, cost: 60000, count: 0 }
  ];

  clickUpgrades = [
    { name: "Dedo de Hierro", extraClick: 1, cost: 80, count: 0 },
    { name: "Dedo Dorado", extraClick: 5, cost: 300, count: 0 },
    { name: "Dedo de Diamante", extraClick: 10, cost: 1200, count: 0 }
  ];

  powerupVisible: boolean = false;
  powerupX = 50;
  powerupY = 50;
  powerupMultiplier = 5;
  powerupActive = false;

  private intervalTick: any;
  private intervalPowerupSpawner: any;

  saveGame() {
    const data = {
      monedas: this.monedas,
      monedasTotalesGeneradas: this.monedasTotalesGeneradas,
      monedasPorClick: this.monedasPorClick,
      produccionPorSegundo: this.produccionPorSegundo,
      multiplicadorTemporal: this.multiplicadorTemporal,
      upgrades: this.upgrades,
      clickUpgrades: this.clickUpgrades
    };

    localStorage.setItem("clickerSave", JSON.stringify(data));
  }

  loadGame() {
    const raw = localStorage.getItem("clickerSave");
    if (!raw) return;

    try {
      const data = JSON.parse(raw);

      this.monedas = data.monedas ?? 0;
      this.monedasTotalesGeneradas = data.monedasTotalesGeneradas ?? 0;
      this.monedasPorClick = data.monedasPorClick ?? 1;
      this.produccionPorSegundo = data.produccionPorSegundo ?? 0;
      this.multiplicadorTemporal = data.multiplicadorTemporal ?? 1;

      if (data.upgrades) this.upgrades = data.upgrades;
      if (data.clickUpgrades) this.clickUpgrades = data.clickUpgrades;
    } catch (e) {
      console.error("Error cargando partida:", e);
    }
  }

  ngOnInit(): void {
    this.loadGame();
    this.halloweenService.modoHalloween$.subscribe(estado => {
      this.modoHalloween = estado;
      if (estado) this.modoNavidad = false;
    });
    this.navidadService.modoNavidad$.subscribe(estado => {
      this.modoNavidad = estado;
      if (estado) this.modoHalloween = false;
    });
    this.intervalTick = setInterval(() => {
      this.generateIncome();
    }, 1000);
    this.intervalPowerupSpawner = setInterval(() => {
      this.spawnPowerup();
    }, 12000);
    setInterval(() => this.saveGame(), 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalTick);
    clearInterval(this.intervalPowerupSpawner);
  }

  clickMoneda() {
    const total = this.monedasPorClick * this.multiplicadorTemporal;
    this.monedas += total;
    this.monedasTotalesGeneradas += total;
    this.saveGame();
  }

  generateIncome() {
    const amount = this.produccionPorSegundo * this.multiplicadorTemporal;
    this.monedas += amount;
    this.monedasTotalesGeneradas += amount;
    this.saveGame();
  }

  buyUpgrade(i: number) {
    const u = this.upgrades[i];
    if (this.monedas < u.cost) return;
    this.monedas -= u.cost;
    u.count++;
    this.produccionPorSegundo += u.production;
    u.cost = Math.floor(u.cost * 1.25);
    this.saveGame();
  }


  buyClickUpgrade(i: number) {
    const c = this.clickUpgrades[i];
    if (this.monedas < c.cost) return;
    this.monedas -= c.cost;
    c.count++;
    this.monedasPorClick += c.extraClick;
    c.cost = Math.floor(c.cost * 1.30);
    this.saveGame();
  }

  spawnPowerup() {
    if (this.powerupActive) return;
    if (Math.random() < 0.5) return;

    this.powerupVisible = true;
    this.powerupX = Math.random() * 80 + 10;
    this.powerupY = Math.random() * 60 + 10;
  }

  clickPowerup() {
    this.powerupVisible = false;
    this.powerupActive = true;
    this.multiplicadorTemporal = this.powerupMultiplier;
    this.powerupTiempoRestante = this.powerupDuracion;
    if (this.powerupInterval) clearInterval(this.powerupInterval);
    this.powerupInterval = setInterval(() => {
      this.powerupTiempoRestante -= 100;
      if (this.powerupTiempoRestante <= 0) {
        clearInterval(this.powerupInterval);
        this.powerupActive = false;
        this.multiplicadorTemporal = 1;
      }
    }, 100);
  }

  resetGame() {
    this.monedas = 0;
    this.monedasTotalesGeneradas = 0;
    this.monedasPorClick = 1;
    this.produccionPorSegundo = 0;
    this.multiplicadorTemporal = 1;

    this.upgrades.forEach(u => {
      u.count = 0;
      u.cost = Math.floor(u.production * 50);
    });

    this.clickUpgrades.forEach(c => {
      c.count = 0;
      c.cost = Math.floor(c.extraClick * 80);
    });

    this.saveGame();
  }

  formatNumber(num: number): string {
    if (num < 1000) return num.toString();

    if (num < 1_000_000)
      return (num / 1000).toLocaleString('es-ES', { minimumFractionDigits: 3, maximumFractionDigits: 3 });

    if (num < 1_000_000_000)
      return (num / 1_000_000).toLocaleString('es-ES', { minimumFractionDigits: 3, maximumFractionDigits: 3 }) + " millones";

    return (num / 1_000_000_000).toLocaleString('es-ES', { minimumFractionDigits: 3, maximumFractionDigits: 3 }) + " billones";
  }
}