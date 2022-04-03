using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MessagingWeb.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MessageHistory",
                columns: table => new
                {
                    MessageId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Phone = table.Column<string>(type: "varchar(15)", nullable: true),
                    Message = table.Column<string>(type: "nvarchar(250)", nullable: true),
                    SendDate = table.Column<DateTimeOffset>(type: "datetimeoffset(7)", nullable: false),
                    Timestamp = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MessageHistory", x => x.MessageId);
                });

            migrationBuilder.CreateIndex(
                name: "Idx_MessageId",
                table: "MessageHistory",
                column: "MessageId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MessageHistory");
        }
    }
}
