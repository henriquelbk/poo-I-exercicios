export class Video {
    
    constructor(
        private id: string,
        private titulo: string,
        private duracaoEmSegundos: number,
        private dataDeUpload: string
        ) 
        {}
        
    public getId(): string {
        return this.id;
    }
    public setId(newValue: string): void {
        this.id = newValue;
    }
    public getTitulo(): string {
        return this.titulo;
    }
    public setTitulo(newValue: string): void {
        this.titulo = newValue;
    }
    public getDuracaoEmSegundos(): number {
        return this.duracaoEmSegundos; 
    }
    public setDuracaoEmSegundos(newValue: number): void {
        this.duracaoEmSegundos = newValue;
    }   
    public getDataDeUpload(): string {
        return this.dataDeUpload;
    }
    public setDataDeUpload(newValue: string): void {
        this.dataDeUpload = newValue;
    }
}