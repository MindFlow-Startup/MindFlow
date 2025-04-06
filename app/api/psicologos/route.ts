import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const psicologos = await prisma.psicologo.findMany();

    return new Response(JSON.stringify(psicologos), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log('Erro ao buscar psicólogos:', error);

    return new Response(JSON.stringify({ error: 'Erro interno do servidor' }), {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  try {
    const dados = await request.json();

    // 👉 Formata o CRP pegando os dois primeiros dígitos como estado
    function formatCRP(input: string): string {
      const estadosMap: Record<string, string> = {
        "01": "SP",
        "02": "RJ",
        "03": "MG",
        "04": "RS",
        "05": "PR",
        "06": "DF",
        "07": "BA",
        "08": "PE",
        "09": "GO",
        "10": "PB",
      };

      const limpo = input.replace("/", "").replace("-", "").trim(); // limpa barras e traços
      const codigo = limpo.slice(0, 2); // primeiros dois dígitos
      const numero = limpo.slice(2); // o resto é o número
      const estado = estadosMap[codigo] || "XX";

      return `${numero}-${estado}`;
    }

    const crpFormatado = formatCRP(dados.crp);

    const novo = {
      ...dados,
      crp: crpFormatado,
    };

    // 👉 (Opcional) salvar no banco:
    // const psicologoCriado = await prisma.psicologo.create({ data: novo });

    return new Response(JSON.stringify(novo), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Erro ao processar requisição POST:", error);

    return new Response(
      JSON.stringify({ error: "Erro interno ao processar requisição" }),
      { status: 500 }
    );
  }
}

  


export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { id, crp, email, nomeCompleto, dataNascimento, especialidades } = data;

    if (!id) {
      return new Response(JSON.stringify({ error: 'ID é obrigatório' }), {
        status: 400,
      });
    }

    const psicologoAtualizado = await prisma.psicologo.update({
      where: { id },
      data: {
        crp,
        email,
        nomeCompleto,
        dataNascimento: dataNascimento ? new Date(dataNascimento) : undefined,
        especialidades,
      },
    });

    return new Response(JSON.stringify(psicologoAtualizado), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Erro ao atualizar psicólogo:', error);

    return new Response(
      JSON.stringify({ error: 'Erro interno ao atualizar psicólogo' }),
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();

        if (!id) {
            return new Response(JSON.stringify({ error: 'ID é obrigatório' }), {
                status: 400,
            });
        }

        await prisma.psicologo.delete({
            where: { id },
        });

        return new Response(JSON.stringify({ message: 'Psicólogo deletado com sucesso' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Erro ao deletar psicólogo:', error);

        return new Response(
            JSON.stringify({ error: 'Erro interno ao deletar psicólogo' }),
            { status: 500 }
        );
    }
}
