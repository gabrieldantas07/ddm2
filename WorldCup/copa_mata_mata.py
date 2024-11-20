import random

# Times participantes
times = [
    "Brasil", "Argentina", "França", "Alemanha", "Espanha", "Inglaterra", 
    "Portugal", "Itália", "Holanda", "Uruguai", "Croácia", "Bélgica", 
    "Japão", "México", "Senegal", "Coreia do Sul"
]

def sortear_confrontos(times):
    """Sorteia confrontos para a fase atual."""
    random.shuffle(times)
    return [(times[i], times[i+1]) for i in range(0, len(times), 2)]

def simular_placar():
    """Simula o placar de um jogo."""
    return random.randint(0, 5), random.randint(0, 5)

def decidir_penaltis():
    """Decide o vencedor nos pênaltis."""
    return random.choice(["Time 1", "Time 2"])

def simular_jogo(time1, time2):
    """Simula um jogo e retorna o vencedor."""
    gol1, gol2 = simular_placar()
    print(f"{time1} {gol1} x {gol2} {time2}")
    if gol1 > gol2:
        return time1
    elif gol2 > gol1:
        return time2
    else:
        print("Empate! Decidindo nos pênaltis...")
        vencedor_penaltis = decidir_penaltis()
        vencedor = time1 if vencedor_penaltis == "Time 1" else time2
        print(f"Vencedor nos pênaltis: {vencedor}")
        return vencedor

def executar_fase(times, fase):
    """Executa uma fase do torneio."""
    print(f"\n--- {fase} ---")
    confrontos = sortear_confrontos(times)
    vencedores = []
    for time1, time2 in confrontos:
        print(f"Jogo: {time1} x {time2}")
        vencedor = simular_jogo(time1, time2)
        vencedores.append(vencedor)
    return vencedores

def main():
    print("Bem-vindo à Simulação da Copa do Mundo!")
    fase_atual = "Oitavas de Final"
    times_restantes = times
    
    while len(times_restantes) > 1:
        times_restantes = executar_fase(times_restantes, fase_atual)
        if len(times_restantes) == 8:
            fase_atual = "Quartas de Final"
        elif len(times_restantes) == 4:
            fase_atual = "Semifinais"
        elif len(times_restantes) == 2:
            fase_atual = "Final"
    
    print("\n=== Grande Campeão ===")
    print(f"{times_restantes[0]} é o campeão da Copa do Mundo!")

if __name__ == "__main__":
    main()