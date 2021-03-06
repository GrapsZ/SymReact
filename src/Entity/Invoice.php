<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\InvoiceRepository")
 * @ApiResource(
 *     subresourceOperations={
 *          "api_customers_invoices_get_subresource"={
 *              "normalization_context"={"groups"={"invoices_subresource"}}
 *          }
 *      },
 *     attributes={
 *          "order": {"sentAt":"desc"},
 *          "pagination_items_per_page"=20,
 *          "pagination_enabled"=false
 *     },
 *     normalizationContext={
 *          "groups"={"invoices_read"}
 *    },
 *     collectionOperations={"GET"={"path"="/factures"}, "POST"={"path"="/factures"}},
 *     itemOperations={
 *          "GET"={"path"="/factures/{id}"},
 *          "PUT"={"path"="/factures/{id}"},
 *          "DELETE"={"path"="/factures/{id}"},
 *          "inscrement"={
 *              "method"="POST",
 *              "path"="/factures/{id}/increment",
 *              "controller"="App\Controller\InvoiceIncrementationController",
 *              "swagger_context"={
 *                  "summary"="Incrémente une facture",
 *                  "description"="Incrémente le chrono d'une facture donnée",
 *              }
 *          }
 *     },
 *     denormalizationContext={"disable_type_enforcement"=true}
 * )
 * @ApiFilter(OrderFilter::class, properties={"amount", "sentAt"})
 */

class Invoice
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"invoices_read", "customers_read", "invoices_subresource"})
     */
    private $id;

    /**
     * @ORM\Column(type="float")
     * @Groups({"invoices_read", "customers_read", "invoices_subresource"})
     * @Assert\NotBlank(message="Le montant de la facture ne peut être nul.")
     * @Assert\Type(type="numeric", message="Le montant de la facture doit-être numérique !")
     */
    private $amount;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"invoices_read", "customers_read", "invoices_subresource"})
     * @Assert\DateTime(message="La date doit être au format YYYY-MM-DD")
     * @Assert\NotBlank(message="La date d'envoi ne peut être vide.")
     */
    private $sentAt;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"invoices_read", "customers_read", "invoices_subresource"})
     * @Assert\NotBlank(message="Le statut de la facture est obligatoire .")
     * @Assert\Choice(choices={"SENT", "PAID", "CANCELLED"}, message="Le statut doit correspondre à l'un des statuts présents dans le tableau.")
     */
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Customer", inversedBy="invoices")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"invoices_read"})
     * @Assert\NotBlank(message="Le client de la facture doit être renseigné.")
     */
    private $customer;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"invoices_read", "customers_read", "invoices_subresource"})
     * @Assert\NotBlank(message="Un numéro de facture doit-être renseigné.")
     * @Assert\Type(type="integer", message="Un numéro de facture doit-être un nombre.")
     */
    private $chrono;

    /**
     * Permet de récupérer le User à qui appartient la facture
     * Champs calculé
     * @Groups({"invoices_read", "invoices_subresource"})
     * @return User
     */
    public function getUser(): User
    {
        return $this->customer->getUser();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount($amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getSentAt(): ?\DateTimeInterface
    {
        return $this->sentAt;
    }

    public function setSentAt($sentAt): self
    {
        $this->sentAt = $sentAt;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): self
    {
        $this->customer = $customer;

        return $this;
    }

    public function getChrono(): ?int
    {
        return $this->chrono;
    }

    public function setChrono($chrono): self
    {
        $this->chrono = $chrono;

        return $this;
    }
}
